import { Result as ResultType, Vote } from "@/lib/types";

export const Result = ({
  timeLeft,
  currentResult,
  currentVote,
}: {
  timeLeft: number | null;
  currentResult: ResultType | null;
  currentVote: Vote | null;
}) => {
  return (
    <>
      {currentVote && timeLeft ? (
        <div className="text-center max-w-[90vw] mx-auto">
          <p>
            You betted on the price going {currentVote.vote} at the price of $
            {currentVote.price}.
          </p>
          <p>We will find out in {Math.round(timeLeft)} seconds. </p>
          <p>Good Luck!</p>
        </div>
      ) : null}
      {currentResult ? (
        <div className="text-center max-w-[90vw] mx-auto">
          <p>
            You betted on the price going {currentResult.vote} at $
            {currentResult.betPrice} and the price is now ${currentResult.price}
            .
          </p>
          <p>
            {currentResult.points
              ? "You got one point"
              : "No points for you sorry"}
          </p>
        </div>
      ) : null}
    </>
  );
};
