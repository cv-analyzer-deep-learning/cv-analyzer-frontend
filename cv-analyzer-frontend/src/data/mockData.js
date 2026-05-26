export const mockResponse = {
  status: 'success',
  data: {
    compatibility_score: 78,
    radar_chart_data: {
      technical_skills: 4,
      domain_knowledge: 3,
      infrastructure: 5,
      soft_skills: 4,
      experience: 3,
    },
    matching_entities: ['React', 'TypeScript', 'Node.js', 'SaaS'],
    missing_entities: ['GraphQL', 'Docker', 'CI/CD'],
    actionable_feedback: [
      "Le CV met bien en valeur React et Node.js, mais l'offre exige GraphQL. Ajoutez des exemples concrets d'intégration d'API.",
      "Il manque des mentions de containerisation. Si vous avez utilisé Docker, ajoutez-le à la section 'Outils'.",
      "L'offre demande du 'leadership'. Reformulez vos expériences pour souligner la supervision de projets techniques.",
    ],
  },
}
