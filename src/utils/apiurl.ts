// const baseURL = 'http://localhost:3001/mockapi';
const baseURL = 'https://rosalie-overbooming-coevally.ngrok-free.dev/mockapi';
const ApiURL = {
  game: {
    fetchPracticeGame: `${baseURL}/practiceGames`,
    fetchTournamentGame: `${baseURL}/tournamentGames`,
  },
  report: {
    fetchProgressReport: `${baseURL}/progressReports`,
  },
};

export default ApiURL;
