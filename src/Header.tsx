export default function Header({ title }: { title: string }) {
  return (
    <header className="w-calc-100%-2px p-1 bg-blue-400 text-indigo-800 flex justify-between items-center text-3xl">
      <h1>{title}</h1>
    </header>
  );
}
