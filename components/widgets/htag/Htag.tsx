import { IHtagProps } from "./Htag.props";

export const Htag = ({tag, children, ...props}: IHtagProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return (<h1 {...props}>{children}</h1>);
    case 'h2':
      return (<h2 {...props}>{children}</h2>);
    case 'h3':
      return (<h3 {...props}>{children}</h3>)
        
    default:
      return (<h1 {...props}>{children}</h1>);

  }

};