const TiltDataDisplay = ({ data }: { data: any }) => {
  if (!data)
    return (
      <div>
        Point here: <br />
        👇
      </div>
    );

  const { angle, percentageX, percentageY, tiltX, tiltY } = data;
  return (
    <div style={{ position: 'relative' }}>
      angle: {angle.toFixed(2)}
      <br />
      percentX: {percentageX.toFixed(2)}
      <br />
      percentY: {percentageY.toFixed(2)}
      <br />
      tiltX: {tiltX}
      <br />
      tiltY: {tiltY}
      <br />
    </div>
  );
};

export default TiltDataDisplay;
