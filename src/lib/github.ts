// Fetched once at build time. Uses GitHub GraphQL when GITHUB_TOKEN is set
// (counts private contributions if enabled on the profile), otherwise a public mirror.

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

async function fromPublic(login: string): Promise<Activity> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${login}?y=last`);
  if (!res.ok) throw new Error(`contributions API ${res.status}`);
  const data = await res.json();
  const days: Day[] = data.contributions;

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
  return { total: data.total.lastYear, weeks };
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
