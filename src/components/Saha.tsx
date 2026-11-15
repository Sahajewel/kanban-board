export default function Saha() {
  const user = {
    name: "Saha Jewel Kumar",
    age: 37,
    profession: "Machine Operator",
    location: "Saitama",
  };

  return (
    <div>
      <pre>
        {JSON.stringify(
          user,
          (key, value) => {
            if (key === "profession" || key === "location") {
              return undefined;
            }
            return value;
          },
          1,
        )}
      </pre>
      <p>{JSON.stringify(user, null, 1)}</p>
    </div>
  );
}
