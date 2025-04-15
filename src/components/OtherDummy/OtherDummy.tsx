import './OtherDummy.scss';

const OtherDummy = () => {
  const url = window.location.href;
  const pathname = new URL(url).pathname;

  const currentPath = pathname.split('/')[1].split('&');

  const upperPathArr = currentPath.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1)
  );

  const upperPath = upperPathArr.join(' & ');

  return (
    <div className="otherDummy">
      <div className="container">
        <h1>{upperPath}</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
  );
};

export default OtherDummy;
