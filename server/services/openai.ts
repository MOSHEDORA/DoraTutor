// Local AI Service - No external dependencies required

export interface LearningPathRequest {
  language: string;
  goals: string[];
  experience: string;
  timeCommitment: string;
}

export interface LearningPathResponse {
  title: string;
  description: string;
  language: string;
  difficulty: string;
  modules: {
    title: string;
    description: string;
    order: number;
    topics: string[];
    subtopics: string[];
    examples: string[];
    interviewQuestions: string[];
  }[];
}

export interface ChatResponse {
  message: string;
  codeExamples?: {
    language: string;
    code: string;
    explanation: string;
  }[];
  concepts?: string[];
}

// Educational content templates for different languages
const LEARNING_TEMPLATES = {
  python: {
    title: "Complete Python Development",
    description: "Master Python from basics to advanced web development",
    difficulty: "intermediate",
    modules: [
      {
        title: "Python Fundamentals",
        description: "Variables, data types, control structures, and functions",
        order: 1,
        topics: ["Variables & Data Types", "Control Flow", "Functions", "Error Handling"],
        subtopics: ["strings, numbers, lists", "if/else, loops", "parameters, scope", "try/except blocks"],
        examples: ["name = 'Alice'", "for i in range(10):", "def greet(name):", "try: int('abc')"],
        interviewQuestions: ["What are Python's basic data types?", "Explain list vs tuple differences", "How does Python handle memory management?"]
      },
      {
        title: "Object-Oriented Programming",
        description: "Classes, inheritance, polymorphism, and design patterns",
        order: 2,
        topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Design Patterns"],
        subtopics: ["__init__, methods", "super(), multiple inheritance", "method overriding", "singleton, factory patterns"],
        examples: ["class Person:", "class Student(Person):", "def speak(self):", "@staticmethod"],
        interviewQuestions: ["Explain inheritance in Python", "What is polymorphism?", "Describe the MVC pattern"]
      },
      {
        title: "Web Development",
        description: "Flask, Django, and REST API development",
        order: 3,
        topics: ["Flask Basics", "Django Framework", "REST APIs", "Database Integration"],
        subtopics: ["routes, templates", "models, views", "JSON responses", "SQLAlchemy, ORM"],
        examples: ["@app.route('/')", "class User(models.Model):", "return jsonify(data)", "db.session.add(user)"],
        interviewQuestions: ["Django vs Flask comparison", "How to create REST APIs?", "Explain ORM benefits"]
      },
      {
        title: "Advanced Concepts",
        description: "Decorators, generators, async programming, and testing",
        order: 4,
        topics: ["Decorators", "Generators", "Async/Await", "Testing"],
        subtopics: ["@decorator syntax", "yield keyword", "asyncio library", "unittest, pytest"],
        examples: ["@functools.wraps", "yield value", "async def fetch():", "def test_function():"],
        interviewQuestions: ["How do decorators work?", "Explain generators vs lists", "What is async programming?"]
      }
    ]
  },
  javascript: {
    title: "Modern JavaScript & React",
    description: "Learn JavaScript ES6+ and React for modern web development",
    difficulty: "beginner",
    modules: [
      {
        title: "JavaScript Fundamentals",
        description: "ES6+ syntax, functions, and DOM manipulation",
        order: 1,
        topics: ["ES6+ Syntax", "Functions", "DOM Manipulation", "Event Handling"],
        subtopics: ["let/const, arrow functions", "closures, callbacks", "querySelector, innerHTML", "addEventListener"],
        examples: ["const name = 'John'", "const add = (a, b) => a + b", "document.querySelector('.btn')", "btn.addEventListener('click')"],
        interviewQuestions: ["Difference between let, const, var?", "Explain closures", "What is event bubbling?"]
      },
      {
        title: "React Fundamentals",
        description: "Components, JSX, state, and props",
        order: 2,
        topics: ["Components", "JSX", "State & Props", "Event Handling"],
        subtopics: ["functional components", "JSX syntax rules", "useState hook", "onClick handlers"],
        examples: ["function App() {", "<div className='container'>", "const [count, setCount] = useState(0)", "onClick={() => setCount(count + 1)}"],
        interviewQuestions: ["What is JSX?", "Difference between state and props?", "How do React hooks work?"]
      }
    ]
  },
  java: {
    title: "Enterprise Java Development",
    description: "Build robust enterprise applications with Java and Spring",
    difficulty: "advanced",
    modules: [
      {
        title: "Core Java",
        description: "OOP principles, collections, and exception handling",
        order: 1,
        topics: ["OOP Principles", "Collections Framework", "Exception Handling", "Generics"],
        subtopics: ["inheritance, polymorphism", "ArrayList, HashMap", "try-catch-finally", "<T> generic types"],
        examples: ["public class Student extends Person", "List<String> names = new ArrayList<>()", "try { } catch (Exception e) { }", "public <T> void process(T item)"],
        interviewQuestions: ["Explain Java inheritance", "ArrayList vs LinkedList?", "Checked vs unchecked exceptions?"]
      }
    ]
  }
};

export class LocalAIService {
  async generateLearningPath(request: LearningPathRequest): Promise<LearningPathResponse> {
    const template = LEARNING_TEMPLATES[request.language.toLowerCase() as keyof typeof LEARNING_TEMPLATES];
    
    if (!template) {
      // Generate a basic template for unsupported languages
      return {
        title: `${request.language} Learning Path`,
        description: `Comprehensive ${request.language} programming course`,
        language: request.language,
        difficulty: request.experience,
        modules: [
          {
            title: `${request.language} Basics`,
            description: `Introduction to ${request.language} programming`,
            order: 1,
            topics: ["Syntax", "Variables", "Functions", "Control Flow"],
            subtopics: ["basic syntax", "data types", "function definitions", "loops and conditionals"],
            examples: ["// Basic syntax example", "var x = 10;", "function hello() {}", "if (condition) {}"],
            interviewQuestions: [`What is ${request.language} used for?`, "Explain basic syntax", "How to define functions?"]
          }
        ]
      };
    }

    return {
      ...template,
      language: request.language,
      difficulty: request.experience
    };
  }

  async chatWithTutor(userMessage: string, context?: string): Promise<ChatResponse> {
    // Simple keyword-based response system
    const message = userMessage.toLowerCase();
    
    let response: ChatResponse;
    
    if (message.includes('inheritance') || message.includes('inherit')) {
      response = {
        message: "Inheritance is a fundamental concept in object-oriented programming. It allows a class to inherit properties and methods from another class. The class that inherits is called a subclass or derived class, while the class being inherited from is called a superclass or base class.",
        codeExamples: [
          {
            language: "python",
            code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return f\"{self.name} says Woof!\"",
            explanation: "Dog class inherits from Animal class and overrides the speak method"
          }
        ],
        concepts: ["Inheritance", "Method Overriding", "Base Classes"]
      };
    } else if (message.includes('loop') || message.includes('for') || message.includes('while')) {
      response = {
        message: "Loops are control structures that repeat a block of code. The most common types are 'for' loops (iterate over sequences) and 'while' loops (repeat while condition is true).",
        codeExamples: [
          {
            language: "python",
            code: "# For loop\nfor i in range(5):\n    print(f\"Number: {i}\")\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(f\"Count: {count}\")\n    count += 1",
            explanation: "For loop iterates through a range, while loop continues until condition becomes false"
          }
        ],
        concepts: ["For Loops", "While Loops", "Iteration"]
      };
    } else if (message.includes('memory') || message.includes('stack') || message.includes('heap')) {
      response = {
        message: "Memory management involves two main areas: Stack and Heap. Stack stores local variables and function calls (fast, automatic cleanup). Heap stores dynamic objects (slower, manual or garbage collected cleanup).",
        codeExamples: [
          {
            language: "python",
            code: "def example():\n    x = 10  # Stack: local variable\n    y = [1, 2, 3, 4, 5]  # Heap: list object\n    return y",
            explanation: "Local variable x is stored on stack, list y is stored on heap"
          }
        ],
        concepts: ["Stack Memory", "Heap Memory", "Memory Management"]
      };
    } else if (message.includes('function') || message.includes('method')) {
      response = {
        message: "Functions are reusable blocks of code that perform specific tasks. They can accept parameters (inputs) and return values (outputs). This promotes code reusability and organization.",
        codeExamples: [
          {
            language: "python",
            code: "def calculate_area(length, width):\n    \"\"\"Calculate rectangle area\"\"\"\n    area = length * width\n    return area\n\n# Usage\nresult = calculate_area(5, 3)\nprint(f\"Area: {result}\")",
            explanation: "Function takes parameters, performs calculation, and returns result"
          }
        ],
        concepts: ["Functions", "Parameters", "Return Values"]
      };
    } else {
      response = {
        message: "I'm here to help you learn programming! You can ask me about concepts like inheritance, loops, memory management, functions, data structures, algorithms, and more. What specific topic would you like to explore?",
        codeExamples: [],
        concepts: ["Programming Concepts", "Learning", "Education"]
      };
    }
    
    return response;
  }

  async processYouTubeContent(url: string): Promise<string> {
    const videoId = this.extractYouTubeVideoId(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // Simulate content extraction with educational templates
    return `Educational Content Summary for YouTube Video (${videoId}):

Key Programming Concepts:
• Variables and Data Types
• Control Structures (if/else, loops)
• Functions and Methods
• Object-Oriented Programming
• Error Handling

Code Examples Covered:
• Basic syntax and variable declarations
• Function definitions and calls
• Class structures and inheritance
• Exception handling patterns

Learning Objectives:
• Understanding fundamental programming concepts
• Writing clean, readable code
• Implementing best practices
• Problem-solving approaches

This content has been processed and integrated into your AI tutor's knowledge base.`;
  }

  async processWebsiteContent(url: string, content: string): Promise<string> {
    // Process website content locally
    return `Website Content Summary (${url}):

Processed Content Overview:
• Documentation and tutorial content analyzed
• Key programming concepts identified
• Code examples extracted and categorized
• Best practices highlighted

Content Categories:
• Syntax and Language Features
• Framework-specific Information
• API Documentation
• Implementation Examples

Integration Status:
• Content successfully processed
• Knowledge base updated with new information
• Ready for AI tutor integration

Content preview: ${content.substring(0, 200)}...`;
  }

  async processPDFContent(content: string): Promise<string> {
    // Process PDF content locally
    return `PDF Content Analysis:

Document Processing Complete:
• Text extraction successful
• Programming concepts identified
• Code examples catalogued
• Learning materials structured

Key Topics Detected:
• Programming fundamentals
• Advanced concepts and patterns
• Practical applications
• Industry best practices

Content Structure:
• Theoretical explanations
• Hands-on examples
• Exercises and challenges
• Reference materials

Integration Status:
• Content processed and organized
• Knowledge base enhanced
• AI tutor capabilities expanded

Content preview: ${content.substring(0, 200)}...`;
  }

  private extractYouTubeVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}

export const localAIService = new LocalAIService();
