import Link from "next/link";

function Page() {
  return (
    <body>
      <h1>Games</h1>
      <Link href="/games/minesweeper">Minesweeper</Link>
    </body>
  );
}

export default Page;
