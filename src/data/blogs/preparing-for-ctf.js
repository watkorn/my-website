import React from "react";
import ctftimeImg from "../../assets/ctftime.png"; // รูปประกอบสี่เหลี่ยม

const preparingForCTF = {
  id: 1,
  slug: "preparing-for-ctf",
  year: 2025,
  title: "Preparing for CTF",
  desc: "Tips and strategies to get ready for Capture The Flag competitions",
  render: () => (
    <div className="space-y-6">
      {/* Intro */}
      <p>
        Capture The Flag (CTF) competitions are exciting challenges in cybersecurity.
        Proper preparation will help you improve your skills and enjoy the competition more.
      </p>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={ctftimeImg}
          alt="CTF Preparation"
          className="object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Main content */}
      <div className="space-y-4">
        <p>Before joining a CTF, make sure to strengthen your fundamentals in:</p>

        <ul className="list-disc list-inside space-y-1">
          <li>Web security: SQL injection, XSS, CSRF</li>
          <li>Cryptography: basic ciphers, hashing, encryption</li>
          <li>Binary exploitation: buffer overflow, reverse engineering</li>
          <li>Forensics: analyzing files, memory, network traffic</li>
          <li>Networking: protocols, packet analysis, ports</li>
        </ul>

        <p>
          Practice on platforms like Hack The Box, TryHackMe, and PicoCTF to gain hands-on experience
          and learn new techniques.
        </p>

        <p>
          Keep notes, create cheat sheets, and collaborate with teammates. This accelerates learning
          and prepares you for real competitions.
        </p>
      </div>
    </div>
  ),
};

export default preparingForCTF;
