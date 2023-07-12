import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { [key: string]: any };
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="min-h-screen py-16 flex flex-col justify-center items-center" id="error-page">
      <NonIdealState
        action={<Button minimal={true} outlined={true} intent={Intent.WARNING} onClick={() => navigate('/')}>back</Button>}
        title="Oops!"
        description={'Sorry, an unexpected error has occured.'}
        icon="error"
      >
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </NonIdealState>
    </div>
  );
}
