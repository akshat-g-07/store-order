import { ArrowTopRightIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="w-full left-0 h-fit border-y border-grid px-8 sm:px-6 md:px-12 py-5 text-muted-foreground justify-center fixed bottom-0 bg-brand-primaryGreen text-white">
      <div className="w-full flex justify-center">
        <a
          href="https://www.instagram.com/the.momosmafia.jind"
          target="_blank"
          className="font-semibold text-orange-500 hover:underline flex items-center w-fit space-x-2 justify-center mb-2"
        >
          <InstagramLogoIcon className="size-5" />
          <span>the.momosmafia.jind</span>
        </a>
      </div>
      <div className="w-full text-center flex items-center justify-center gap-x-1 text-base">
        <p>Made by</p>
        <a
          href="https://pixelventurers.com"
          target="_blank"
          className="font-semibold text-blue-500 hover:underline flex items-start"
        >
          <span>Pixel Venturers</span>
          <ArrowTopRightIcon className="size-3" />
        </a>
      </div>
      <div className="w-full mt-2 text-center flex items-center justify-center gap-x-1 text-base">
        <p>Powered by</p>
        <a
          href="https://initiatejs.dev/"
          target="_blank"
          className="font-semibold text-yellow-500 hover:underline flex items-start"
        >
          <span>InitiateJS</span>
          <ArrowTopRightIcon className="size-3" />
        </a>
      </div>
    </footer>
  );
}
