// Fetched once at build time. Uses GitHub GraphQL when GITHUB_TOKEN is set
// (counts private contributions if enabled on the profile), otherwise the public profile calendar.

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Activity = { total: number; weeks: Day[][] };

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

async function fromGraphQL(login: string, token: string): Promise<Activity> {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{
    totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const cal = (await res.json()).data.user.contributionsCollection.contributionCalendar;
  return {
    total: cal.totalContributions,
    weeks: cal.weeks.map((w: any) =>
      w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel as keyof typeof LEVELS],
      })),
    ),
  };
}

// GitHub's own profile calendar (the HTML behind the green graph). Includes private
// contributions when "Private contributions" is enabled on the profile.
async function fromPublic(login: string): Promise<Activity> {
  const res = await fetch(`https://github.com/users/${login}/contributions`);
  if (!res.ok) throw new Error(`contributions page ${res.status}`);
  const html = await res.text();

  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    counts.set(id, Number.parseInt(text.replace(/,/g, ''), 10) || 0);
  }

  const days: Day[] = [];
  for (const [tag] of html.matchAll(/<td[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const date = tag.match(/data-date="([^"]+)"/)![1];
    const id = tag.match(/\bid="([^"]+)"/)?.[1] ?? '';
    const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0) as Day['level'];
    days.push({ date, level, count: counts.get(id) ?? 0 });
  }
  if (!days.length) throw new Error('contributions page: no days found');
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Group into Sunday-first weeks, matching GitHub's own calendar.
  const weeks: Day[][] = [];
  let week: Day[] = [];
  for (const day of days) {
    if (new Date(day.date).getUTCDay() === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  }
  if (week.length) weeks.push(week);
  return { total: days.reduce((sum, d) => sum + d.count, 0), weeks };
}

export async function getActivity(login: string): Promise<Activity | null> {
  try {
    const token = import.meta.env.GITHUB_TOKEN;
    return token ? await fromGraphQL(login, token) : await fromPublic(login);
  } catch (err) {
    console.warn(`[github] ${(err as Error).message}`);
    return null;
  }
}
