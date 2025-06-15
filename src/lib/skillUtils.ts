export interface Skill {
  name: string;
  level: number;
}

// Convert legacy string skills and sanitize malformed skill objects
export const convertAndSanitizeSkills = (skills: any[]): Skill[] => {
    if (!skills) return [];
    return skills
      .map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 3 };
        }
        if (typeof skill === 'object' && skill !== null) {
          let name = skill.name;
          let level = skill.level || 3;

          // Check if name is a stringified JSON object
          if (typeof name === 'string' && name.startsWith('{')) {
            try {
              const parsedName = JSON.parse(name);
              if (parsedName && typeof parsedName === 'object' && parsedName.name) {
                name = parsedName.name;
                level = parsedName.level || level;
              }
            } catch (e) {
              // Not a JSON string, do nothing, keep original name
            }
          }
          return { name, level };
        }
        return null; // Filter out invalid entries
      })
      .filter((skill): skill is Skill => skill !== null && typeof skill.name === 'string');
};


export const getLevelText = (level: number) => {
    switch(level) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      case 5: return 'Master';
      default: return 'Intermediate';
    }
};
