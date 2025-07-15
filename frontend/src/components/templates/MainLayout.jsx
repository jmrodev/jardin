import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Jardín</h1>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <span>© 2024 Jardín</span>
      </footer>
    </div>
  );
} 