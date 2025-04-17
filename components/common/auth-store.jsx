import { useState } from "react";
import { setCookie } from "nookies";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthStore({ authKeyword, onAuth }) {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    if (keyword === authKeyword) {
      setCookie(null, "auth", "true", {
        maxAge: 60 * 60 * 24,
      });
      onAuth(true);
    }
  };

  return (
    <div className="py-5 flex flex-col gap-2">
      <label htmlFor="keyword" className="text-center">
        Please enter the keyword:
      </label>
      <Input
        id="keyword"
        type="text"
        value={keyword}
        onChange={handleKeywordChange}
        className="focus-visible:ring-brand-primaryGreen"
      />
      <Button
        onClick={handleSubmit}
        className="bg-brand-primaryGreen hover:bg-brand-primaryGreenHover text-white"
      >
        Submit
      </Button>
    </div>
  );
}
