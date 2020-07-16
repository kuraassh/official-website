import React from "react";
import Link from "next/link";

const SocialMedia = () => {
  return (
    <div className="social-container">
      <Link href="#">
        <a>
          <img src="/social_media/telegram.svg" alt="Telegram"></img>
        </a>
      </Link>
      <Link href="#">
        <a>
          <img src="/social_media/facebook.svg" alt="Facebook"></img>
        </a>
      </Link>
      <Link href="#">
        <a>
          <img src="/social_media/medium.svg" alt="Medium"></img>
        </a>
      </Link>
      <Link href="#">
        <a>
          <img src="/social_media/twitter.svg" alt="Twitterm"></img>
        </a>
      </Link>
      <Link href="#">
        <a>
          <img src="/social_media/github.svg" alt="Github"></img>
        </a>
      </Link>
    </div>
  );
};

export default SocialMedia;
