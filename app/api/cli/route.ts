import { NextResponse } from 'next/server';

export async function GET() {
  // ANSI Color Codes
  const GREEN = '\x1b[32m';
  const CYAN = '\x1b[36m';
  const BOLD = '\x1b[1m';
  const RESET = '\x1b[0m';
  const DIM = '\x1b[2m';

  // Neo-Brutalist Block Border
  const line = '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓';
  
  const content = `
${GREEN}${line}${RESET}
${BOLD}  ABHAY RAJ PATEL ${RESET}
${DIM}  Lucknow, India | Web Developer | 21 y/o${RESET}
${GREEN}${line}${RESET}

${CYAN}${BOLD}WHO AM I?${RESET}
I am a web developer obsessed with Next.js, Tailwind, and
security. I build tools for the web and solve real problems.

${CYAN}${BOLD}CURRENT PROJECTS${RESET}
1. ${BOLD}ExamRankCheck${RESET} - Rank predictor for competitive exams.
   ${DIM}https://examrankcheck.vercel.app${RESET}

2. ${BOLD}CricketDen${RESET} - Live cricket stats & T20 analysis.
   ${DIM}https://cricketden.live${RESET}

3. ${BOLD}IndiaElects${RESET} - Election Tracking in India.
   ${DIM}https://indiaelects.vercel.app${RESET}

${CYAN}${BOLD}SKILLS${RESET}
Next.js • Tailwind CSS • Python • Firebase • Vercel • Git • Figma

${CYAN}${BOLD}CONNECT${RESET}
${BOLD}GitHub:${RESET}   ${DIM}https://github.com/PatelAbhay550${RESET}
${BOLD}Email:${RESET}    ${DIM}patelabhay550@gmail.com${RESET}

${DIM}(Mail 'patelabhay550@gmail.com' for more details)${RESET}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0', // Prevent caching so updates show instantly
    },
  });
}