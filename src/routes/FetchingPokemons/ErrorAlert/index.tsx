const ErrorAlert = ({
  error,
  handleRetry,
}: {
  error: { message: string };
  handleRetry: () => Promise<void>;
}) => {
  return (
    <div>
      <h1>Error! 😟</h1>
      <span role="alert">{error.message}</span>
      <button onClick={handleRetry}>Try again</button>
    </div>
  );
};

export default ErrorAlert;
