import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";

import Simple1ABI from "../abi/Simple1ABI.json";

export default function Home() {
  const [textContent, setTextContent] = useState("");

  const { data: newData } = useContractRead({
    address: "0xf2314b5138C246930d7d330873124C18610cD7ee",
    abi: Simple1ABI,
    functionName: "reviewerToReview",
    args: ["0x27f940eb8fa6740e38a20214592cECE329BDe8Df"],
  });

  console.log(newData);

  useEffect(() => {
    async function init() {
      if (newData) {
        const response = await fetch(newData);
        const textContent = await response.text();
        console.log(textContent);
        setTextContent(textContent);
      }
    }

    init();
  }, [newData]);

  if (newData) {
    return (
      <div>
        Reviewer: <p>0x27f940eb8fa6740e38a20214592cECE329BDe8Df</p>
        Review: <p>{textContent}</p>
      </div>
    );
  } else {
    return <div>Hello</div>;
  }
}
