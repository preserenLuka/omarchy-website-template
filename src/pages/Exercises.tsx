import type { Exercise } from "../types/types";

export const exercises: Exercise[] = [
  { id: "1", name: "squat", category: "legs", sets: 3, reps: 8 },
  // ...
];

export default function Exercises() {
  return (
    <div>
      <h1 className="text-2xl font-light mb-4">exercises</h1>
    </div>
  );
}
