# FlowReady

A powerful, user-defined workflow automation platform for web scraping and data extraction.

## Description

FlowReady is a comprehensive workflow automation platform designed to simplify complex web scraping and data extraction tasks. It provides a drag-and-drop interface where users can build automation sequences represented as directed graphs. Each node in the graph represents a specific task—such as launching a browser, navigating to a page, or extracting text from elements. The core of FlowReady is its intelligent execution engine, which analyzes these graphs to create optimized, multi-phase execution plans. This ensures that data flows correctly between tasks and that all dependencies are met before a task begins. With features like a centralized Task Registry for easy extensibility, a robust credit-based system, and a detailed execution monitoring dashboard, FlowReady empowers users to build reliable and scalable automation workflows without writing complex code.

## Getting Started

### Dependencies

To run FlowReady locally, you need the following:
* **Node.js**: v18.x or later.
* **Postgres**: A running PostgreSQL database instance.
* **Clerk Account**: For managing user authentication and profiles.
* **npm/yarn/pnpm**: A package manager to install dependencies.

### Installing

1. **Clone the repository:**
   ```bash
   git clone https://github.com/haritjoshi/flow-ready.git
   cd flow-ready
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**
   Create a `.env` file in the root directory and populate it with your credentials:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```
4. **Database Initialization:**
   Push the schema to your database using Drizzle Kit:
   ```bash
   npm run db:push
   ```

### Executing program

* **Development Mode:**
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser.
* **Production Build:**
  ```bash
  npm run build
  ```
  ```bash
  npm run start
  ```
* **Database Studio:**
  To inspect your database locally:
  ```bash
  npm run db:studio
  ```

## Help

* **Database Connection Errors:** Ensure your `DATABASE_URL` is correct and the Postgres instance is reachable.
* **Authentication Issues:** Verify that your Clerk API keys match your Clerk project settings and that the redirect URLs are correctly configured.
* **Task Execution Failures:** Check the "Workflow Execution" logs in the dashboard to identify which phase failed and why (e.g., missing input data or selector not found).

## Authors

* **Harit Joshi** - *Initial work* - [haritjoshi](https://github.com/haritjoshi)

## Version History

* **0.1.0**
    * Initial release: Workflow Editor, Execution Engine, Task Registry, and Credit System.

## License

This project is private and not licensed for public use.

## Acknowledgments

* [Next.js](https://nextjs.org/) - The React framework for the web.
* [React Flow](https://reactflow.dev/) - For the node-based editor.
* [Clerk](https://clerk.com/) - Authentication and user management.
* [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases.
* [Shadcn UI](https://ui.shadcn.com/) - Beautifully designed components.
* [Lucide React](https://lucide.dev/) - Beautiful & consistent icons.
