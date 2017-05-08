import { IGameController, GameController } from './vanilla-app/game-controller/game-controller';
import './styles/styles.scss';
import './styles/headings.css';

const gameController: IGameController = new GameController();
gameController.init();

