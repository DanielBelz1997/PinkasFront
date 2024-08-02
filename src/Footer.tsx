export default function Footer({ length }: { length: number | undefined }) {
  return (
    <footer className="w-full p-1 bg-sky-500 text-fuchsia-800 grid place-content-center text-2xl">
      <p>
        {length} List {length === 1 ? "item" : "items"}
      </p>
    </footer>
  );
}
