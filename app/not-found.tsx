import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <article className="prose prose-slate mt-2">
        <h2 className="text-center text-xl">404 Not Found</h2>
        <p>Woops! There is nothing here. </p>
        <p>
          <Link href="/">Go back to the home page</Link>.
        </p>
      </article>
    </div>
  );
}
