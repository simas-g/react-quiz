import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [timeLeft, setTimeLeft] = useState(timeout);
    
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer)
        };
    }, [timeout, onTimeout]);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 100);
        }, 100);

        return () => clearInterval(interval);
    }, []);
  return <progress id="question-time" max={timeout} value={timeLeft} className={mode}/>;
}
