import useSettings from 'app/hooks/useSettings';

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    
   <img width="24" src='/assets/images/fab1.png'/>
    
  );
};

export default MatxLogo;
