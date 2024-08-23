import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Антология отрывков философских текстов</title>
        <meta
          name="description"
          content="Антология отрывков философских текстов"
        />
      </Helmet>
      <div className="about">
        <p>
          <h2>404</h2>
          <br />
          <Link to="/" style={{ textDecoration: 'underline' }}>
            Home
          </Link>
        </p>
      </div>
    </>
  );
}

export default NotFound;
