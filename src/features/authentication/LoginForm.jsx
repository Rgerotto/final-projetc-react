import { useState } from "react";
//import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';


function LoginForm() {
  //email: gerotto@gmail.com
  //password: G123456
  const [email, setEmail] = useState("gerotto@gmail.com");
  const [password, setPassword] = useState("G123456");
  const {login, isLoading} = useLogin();

  function handleSubmit(e) {
e.preventDefault();
if(!email || !password) return;

login({email, password}, {
  onSettled: () => {
    setEmail('');
    setPassword('');
  },
});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>{!isLoading ? 'Log in' : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
