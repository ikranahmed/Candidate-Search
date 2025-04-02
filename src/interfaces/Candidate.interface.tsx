// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
}




// import { useState, useEffect } from 'react';
// import { searchGithub } from '../api/API';
// import { Candidate } from '../interfaces/Candidate.interface';

// const CandidateSearch = () => {
//   const [candidates, setCandidates] = useState<Candidate[]>([]);

//   useEffect(() => {
//     searchGithub('exampleQuery')
//       .then((data) => {
//         setCandidates(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching candidates:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Candidate Search</h1>
//       <ul>
//         {candidates.map((candidate) => (
//           <li key={candidate.id}>
//             <img src={candidate.avatar_url} alt={candidate.login} width="50" />
//             <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
//               {candidate.login}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CandidateSearch;