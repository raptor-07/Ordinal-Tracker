const EmailTemplate = ({
  emailType,
  link,
}: {
  emailType: "confirmation" | "reset";
  link: string;
}) => {
  if (emailType === "confirmation") {
    return (
      <div>
        <h1>Confirm your email</h1>
        <p>Click the link below to confirm your email</p>
        <a href={link}>Confirm Email</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <p>Click the link below to reset your password</p>
      <a href={link}>Reset Password</a>
    </div>
  );
};

export default EmailTemplate;
