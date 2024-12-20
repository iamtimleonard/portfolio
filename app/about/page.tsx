import styles from "./about.module.css";

function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.section}>
        The first code I ever wrote was for a video game review website hosted
        on Geocities, back in the bad old days of table-based layouts.
        Currently, I work at Epoxy.ai, where I am a full stack developer and
        collaborate with a team of experienced engineers to create
        personalization tools in the sports betting space. While there, I gained
        experience building scalable web applications with AWS. I have been
        enjoying getting my hands dirty with cloud native architecture.
      </p>
      <p className={styles.section}>
        Previously, I worked at 21PSTEM, a non-profit specializing in education
        technology for STEM classrooms. There, I worked directly with educators
        and researches to build applications for use in math classes. That work
        tied in well with my own history as an educator and public school
        teacher.
      </p>
      <p className={styles.section}>
        I began my journey as a self-taught web developer. To hone my skills, I
        took part in projects with chingu.io, where I was grouped with other web
        developers across the world to build projects together.
      </p>
      <p className={styles.section}>
        In an earlier life, I was a public school teacher in Warren Township,
        NJ, where I taught instrumental music, and a freelance cellist in New
        York City.
      </p>
      <p className={styles.section}>
        I am also an avid rock climber, shape note singer, mycologist, and
        Seinfeld fan.
      </p>
    </div>
  );
}

export default Page;
