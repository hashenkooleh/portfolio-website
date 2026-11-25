// Posts mirrored 1:1 from LinkedIn (text and images). Newest first.
// Body: paragraphs split by a blank line; [label](url) becomes a link.
export const posts = [
  {
    slug: 'design-system-in-one-piece',
    title: 'How I keep my design system in one piece with Claude Code. Part 1',
    date: '2026-11-25',
    linkedin: 'https://www.linkedin.com/posts/oleh-hashenko_how-i-keep-my-design-system-in-one-piece-activity-7531295841618305024-4HbW',
    images: [
      {
        src: '/writing/design-system-in-one-piece/1.webp',
        width: 800,
        height: 1000,
        alt: 'Cover: How I keep my design system in one piece. Claude Code agents vs. my UI kit',
      },
      {
        src: '/writing/design-system-in-one-piece/2.webp',
        width: 800,
        height: 1000,
        alt: 'One week with AI agents: 11 edits refused, 76 attempts to change rules, 100 times agent said done while broken',
      },
    ],
    body: `If you are designer who works with Claude Code, you probably know this moment. Agent writes code fast, everything looks fine, and after a week the project has its own colors, its own spacing and couple of new buttons nobody designed.
On my previous project I gave agents the design system rules in "just warn me" mode. In few weeks we got 613 classes outside the kit, 469 raw HTML elements and 22 versions of a button. Then a separate phase only for cleanup. Fun)

So the conclusion I came to: if agent can break a rule without consequences, it will break it. Not because it is evil, it's just easier way to get to "done". You can write in claude.md "please use only kit components" as many times as you want, for agent it's context, not a law. By the way, in a recent research of 20 design systems only around half of agent failures could be fixed with prompts.

So on the new project I did the opposite. I don't ask agents to respect the design system, I made it hard to break. Bad edit just doesn't get written. Agent can't say "done" while something is broken. The code is checked by separate agent who didn't write it. And everything that needs judgement (what the kit is allowed to become, what a color means, what we are building at all) stays with me.

I'm not a big fan of building super complex harness with tons of agents. I try to keep as few agents as possible, but still I have a small set that works for me, with different roles and different models. Some build screens, one only reviews, others do research and variants. But more about this in the next post.

Now numbers for one week (76 commits):
- 11 times agent tried to write an edit that breaks the design system, it was refused before it was written
- 100 times agent said "done" while something was broken, and it was not let go until it fixed it
- 76 times agents tried to change the rules or base components themselves to pass the check (yes, they do this 🙃)
- 4 commits didn't go through without independent review
and 0 violations in the final code

To be honest, it's not clean "before/after", the projects are different. But you can see the scale. This is how many times in one week everything would fall apart if I just trusted agents.

And even more honest: the system keeps the form, not the meaning. One agent made up a client checklist, and it quietly ended up in the code. The real one was on a frame from client's video. I caught it, not the automation. Clean screen that passes all the rules still can be a wrong screen.
In the next post I will show how it works inside: which agents, which models, where the checks are.

How do you keep agents inside your design system?
Take care 🫡`,
  },
  {
    slug: 'mobbin-mcp-competitor-research',
    title: 'Competitor research with Mobbin MCP and Claude Code',
    date: '2026-06-18',
    linkedin: 'https://www.linkedin.com/posts/oleh-hashenko_i-work-a-lot-with-technical-saas-apps-and-activity-7473361705163505664-rZzv',
    images: [
      {
        src: '/writing/mobbin-mcp-competitor-research/1.webp',
        width: 800,
        height: 827,
        alt: 'Mobbin MCP × Claude Code',
      },
      {
        src: '/writing/mobbin-mcp-competitor-research/2.webp',
        width: 800,
        height: 827,
        alt: 'Example HTML research report: integration patterns from Mobbin',
      },
    ],
    body: `I work a lot with technical SaaS apps. And very often I need to find some UI pattern that covers a specific task with lots of data, big tables, unique entities. To do this well, I stick to the idea that you need to know your competitors deeply — not just on the level of "how it works," but actually go and read the documentation of every feature. And if there's no access — you go look on YouTube for an overview from someone who reviewed the product, and make yourself a moodboard or a doc with what you saw. Basically — classic competitor research.

Thanks to the developers of modern AI models — I still have a job, and doing research is way easier now with Claude Code at hand or other stuff 😌 

So, finally Mobbin. Won't list all the perks, you already know everything. Recently they released their MCP, which is still in beta. I heard pretty mixed reviews, but I still decided to give it a try — and spoiler: I really liked it.

Most of the negativity is around the idea of generating design based on references, and very often the result is still classic AI-slop. Worth talking through a couple of nuances here:

– Mobbin MCP works with screenshots, not with structured design systems. So Claude sees a flat picture and has to "guess" tokens, spacing, hierarchy. Without an explicit breakdown — the output will be shallow vibe-coded design.

– Quality heavily depends on how specific the prompt is. "Fintech onboarding" will give you visual mush. "B2B onboarding that starts with a goal-setting quiz" — now that's something workable.

– MCP doesn't replace your design thinking. It speeds up discovery, but the decisions are yours. And yes, it's paid only — you can't even try it for free.
In my work I use two modes — research by references and critique of my own design. My approach is this: do complex competitor research as an HTML report that contains pros and cons of competitors, an overview of UI and UX patterns, comparison of best practices, and screenshots of interfaces from Mobbin or documentation. And here I want to underline: when you work with Claude Code, ask it to put this research specifically into a detailed HTML presentation. This should become your manifesto on how to move forward and where to look for the next features and patterns in your competitors.

Before, to do good research with Mobbin, it could take a few working days — to figure things out, look through all the screenshots and prototypes, understand what works and how. Now you can do it in a few hours.

Now with Claude Code I made myself a rule: when designing new functionality, first rely on this manifesto, critique my own ideas through it, and make a complex decision. So I deliberately don't hand Claude Code the full wheel — I don't want another AI-slop. I like staying in control of the process and using my own head.

I'll attach a screenshot of an example of this kind of doc. Would appreciate if you share your experience with Mobbin or similar tools for competitor research. Take care.`,
  },
  {
    slug: 'non-slop-ui-with-claude-code',
    title: 'Can you generate non-slop UI design with Claude Code?',
    date: '2026-06-01',
    linkedin: 'https://www.linkedin.com/posts/oleh-hashenko_can-you-generate-non-slop-ui-design-with-activity-7467178359546982400-n2ow',
    images: [
      {
        src: '/writing/non-slop-ui-with-claude-code/1.webp',
        width: 816,
        height: 1536,
        alt: 'Results from Impeccable, Design Engineer plugin and UI/UX Pro Max',
      },
      {
        src: '/writing/non-slop-ui-with-claude-code/2.webp',
        width: 816,
        height: 1536,
        alt: 'Wireframe prototype, Dribbble reference and three parallel agents',
      },
    ],
    body: `Won't say it went perfect, but I liked it.

You already know that keeping up with every AI tool out there is exhausting. So I made it simple: stuck with Claude Code and just test stuff around it.

Today's task — generating non-slop UI design through Claude Code. Or simpler: how to build your own Google Stitch that actually works outside the X feed (lol)

Picked 3 tools for the test, just because I heard about them and tried them before: 
– Design Engineer plugin by [Volodymyr Merlenko](https://www.linkedin.com/in/merlenkov/)
– Impeccable skill ([impeccable.style](https://impeccable.style/))
– UI/UX Pro Design skill ([GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill))

Maybe there's a way better tool out there for this, would love some feedback. I know Claude Design is getting better too 😌 

How the test went:

1. Put together a product.md — file with task context: what problem the app solves, what elements should be on the screen and in what order. BUT no mention of styles at all. Took an old client project as a base — a web app that tracks car issues by VIN.
2. Built a simple wireframe prototype of the screen with the structure I wanted.
3. Found a visual reference. Usually I don't do this, but this time I wanted to grab a Dribbble case — which, as usual, is unusable but pretty, and on top of that in glassmorphism style, just to make it harder for Claude Code.
4. Opened Claude Code, launched 3 parallel agents in separate folders. Asked the agents to strictly use only the skills of the chosen tool.
5. Fed all 3 the same product.md and the same reference — so the comparison would be fair.
6. Edits, tests, edits, tests.

Side note: each skill has a great reference base of top products in different niches that you can pick from to build your own UI. Trust me, I tested this and it works well, just won't fit in this post. Here I went the route of sharing screenshots of the design I wanted and testing how it works.

Result:
I liked it, it was interesting. Best result came from Impeccable — but the other two didn't fall far behind. Chalking it up to margin of error and differences in stylistic hooks (constraints) of each tool.

Overall impression: each of these skills isn't just a "design generator." There's a ton of stuff inside: research, audit, UI improvement, development. Need to test more and deeper. Strongly recommend reading the docs.

If this gets more than 2 likes, I'll write something else. Take care.`,
  },
];

/** Splits a paragraph into plain text and [label](url) link parts. */
export const parts = (text: string) =>
  text.split(/(\[[^\]]+\]\([^)]+\))/).map((s) => {
    const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? { label: m[1], href: m[2] } : { text: s };
  });

export const postDate = (iso: string, month: 'short' | 'long' = 'short') =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month,
    year: 'numeric',
    timeZone: 'UTC',
  });
