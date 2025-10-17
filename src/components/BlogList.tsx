// src/components/BlogList.tsx
import hospitalInnovationImg from '../assets/Hospital Innovation.png';
import hospitalArchitectureImg from '../assets/Hospital Architecture.png';
import patientCareImg from '../assets/Patient Care Improvement.png';
import hospitalTechnologyImg from '../assets/Hospital Technology.png';

type Post = {
  id: number;
  title: string;
  description: string;
  img: string;
  link: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Hospital Innovation",
    description: "Explores the complexities of integrating new ideas and technologies into healthcare systems, moving beyond development to practical, everyday use in clinical settings.",
    img: hospitalInnovationImg,
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9162066/",
  },
  {
    id: 2,
    title: "Hospital Architecture",
    description: "Examines how the physical environment of a hospital can be a critical medical intervention, from room layout to natural light and green spaces for patient recovery.",
    img: hospitalArchitectureImg,
    link: "https://www.bu.edu/articles/2024/impact-of-hospital-design-on-patient-recovery/",
  },
  {
    id: 3,
    title: "Patient Care Improvement",
    description: "Details the shift towards patient-centered care that tailors healthcare to individual patient preferences, needs, and values for better health outcomes.",
    img: patientCareImg,
    link: "https://www.jebmh.com/articles/improving-healthcare-quality-through-patientcentered-care-108672.html",
  },
  {
    id: 4,
    title: "Hospital Technology",
    description: "Raises important legal and ethical questions about the growing use of AI in healthcare and determining responsibility for medical errors involving AI tools.",
    img: hospitalTechnologyImg,
    link: "https://www.theguardian.com/technology/2025/oct/13/ai-tools-medical-health-liability-artificial-intelligence",
  },
];

export default function BlogList() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Latest Healthcare Insights
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Stay informed with the latest research and developments in hospital innovation, design, and patient care.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group rounded-2xl border-2 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  src={post.img} 
                  alt={post.title}
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-3 text-gray-900 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
                  {post.description}
                </p>
                <a 
                  className="inline-flex items-center gap-2 text-emerald-700 text-base font-semibold hover:text-emerald-800 hover:gap-3 transition-all group-hover:underline" 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
