
    import type { Meta, StoryObj} from '@storybook/react';
    import { MovieCard } from './MovieCard';
    import { BrowserRouter } from 'react-router-dom';

    const meta = {
      title: 'UI-Kit/MovieCard',
      component: MovieCard,
      parameters: {
        layout: 'centered',
      },
      
      decorators: [
        (Story) => (
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        ),
      ],

      argTypes: {
        onClick: { action: 'clicked' },
      },
    } satisfies Meta<typeof MovieCard>;

    export default meta;
    type Story = StoryObj<typeof meta>;

    export const Default: Story = {
      args: {
        movie: {
          kinopoiskId: 123,
          nameRu: 'Интерстеллар',
          posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/258687.jpg',
          year: 2014,
        },
        onClick: () => alert('Клик по карточке!'),
      },
    };

    export const LongTitle: Story = {
      args: {
        movie: {
          kinopoiskId: 456,
          nameRu: 'Очень длинное название фильма, которое должно корректно обрезаться',
          posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/505877.jpg',
          year: 2020,
        },
        onClick: () => alert('Клик по карточке!'),
      },
    };

    export const NoImage: Story = {
      args: {
        movie: {
          kinopoiskId: 789,
          nameRu: 'Фильм без постера',
          posterUrlPreview: '',
          year: 2022,
        },
        onClick: () => alert('Клик по карточке!'),
      },
    };