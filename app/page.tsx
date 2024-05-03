import Image from "next/image";

function Page() {
  return (
    <>
      <h1>Hello, I am Tim Leonard 🚀</h1>
      <a href="https://github.com/iamtimleonard">
        <Image src="/github-mark.svg" alt="Github" width={50} height={50} />
      </a>
      <a href="https://www.linkedin.com/in/timothy-leonard-pa">
        <Image src="/LI-Logo.png" alt="LinkedIn" width={50} height={50} />
      </a>
    </>);
}

export default Page;
