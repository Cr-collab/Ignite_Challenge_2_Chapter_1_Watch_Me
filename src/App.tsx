import { useEffect, useState } from 'react';

import { Button } from './components/Button';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1); // seleção de generos id

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);// todos generos

  const [movies, setMovies] = useState<MovieProps[]>([]); // gardando os filmes 
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps); // selecionado generos

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);// pegando todos generos e gardando a resposta 

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });// pegando os filmes para listar com base no id do genero 

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      < SideBar genres={genres}  selectedGenreId={selectedGenreId}  onHandleClickButton={handleClickButton}/>
      < Content selectedGenre={selectedGenre}  movies={movies} />
    </div>
  )
}