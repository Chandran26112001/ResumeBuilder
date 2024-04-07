export interface FormDataModel {
    profile: {
      first_name: string;
      last_name: string;
      location: string;
      phone: string;
      email: string;
      linkedin_username: string;
    };
    educations: Education[];
    experiences: Experience[];
    projects: Project[];
    skills: Skill[];
    achievements: Achievement[];
    profile_links: ProfileLink[];
  }
  
  interface Education {
    institution: string;
    location: string;
    degree: string;
    duration: string;
  }
  
  interface Experience {
    role: string;
    company: string;
    location: string;
    duration: string;
    description: string[];
  }
  
  interface Project {
    name: string;
    duration: string;
    description: string[];
  }
  
  interface Skill {
    skill: string;
    value: string;
  }
  
  interface Achievement {
    name: string;
    description: string[];
  }
  
  interface ProfileLink {
    platform: string;
    url: string;
  }