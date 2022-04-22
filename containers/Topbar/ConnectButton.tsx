import { Button } from "antd";

function ConnectButton({ createIdentityRequest }) {
  return (
    <Button type="primary" shape="round" onClick={createIdentityRequest}>
      Connect
    </Button>
  );
}

export default ConnectButton;
