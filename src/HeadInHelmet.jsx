import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function HeadInHelmet() {
  return (
    <>
      <Helmet>
        <title>Антология отрывков философских текстов</title>
        <meta
          name="description"
          content="Антология отрывков философских текстов"
        />
      </Helmet>
      <header>
        <div className="links">
          <div className="link link__github">
            <a href="https://github.com/siebentod/extracts">
              AP Github{' '}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ fontSize: '9px' }}
              ></i>
            </a>
          </div>
          <div className="link link__about">
            <Link to="/about">About</Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeadInHelmet;
