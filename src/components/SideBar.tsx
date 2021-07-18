interface propsSidebar{
  genres: Genres[];
  selectedGenreId: number;
  onHandleClickButton: (param:number) => void;
}

type Genres = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
import { Button } from '../components/Button';



export function SideBar(props:propsSidebar) {
  // Complete aqui
return(
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {props.genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => props.onHandleClickButton(genre.id)}
        selected={props.selectedGenreId === genre.id}
      />
    ))}
  </div>

</nav>)
}