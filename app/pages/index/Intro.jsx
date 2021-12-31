export default function Intro() {
  return (
    <section id="header" className="mb-8">
      <div className="flex flex-row justify-center items-center">
        <img
          src="/img/avatar.jpg"
          className="rounded-full w-32 h-32 object-cover"
        />
        <h1 className="pl-4 font-mono font-medium text-2xl text-center">
          Volodymyr
          <br />
          Klymenko
        </h1>
      </div>
      <div className=" mx-auto mt-8 w-3/4 max-w-sm">
        <p className="py-2">
          👋 &nbsp; Hi, I’m a software developer based in Toronto, Ontario.
        </p>
        <p className="py-2">
          👨‍💻 &nbsp; I write code, contribute to Open Source and build things
          with passion and enthusiasm.
        </p>
        <p className="py-2">
          ✍️ &nbsp; I occasionally blog about my journeys in software
          development.
        </p>
      </div>
    </section>
  );
}
