import Link from "next/link";
import styles from "./page.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>About</h1>
        <p>
          このサイトはNext.js 16を使用して構築されました。
        </p>
        <p>
          当サイトではモダンなウェブ技術を活用した高速で効率的なコンテンツを提供しています。
        </p>
        
        <section className={styles.section}>
          <h2>特徴</h2>
          <ul>
            <li>Next.js App Routerを使用した最新の構築</li>
            <li>高速なパフォーマンス</li>
            <li>レスポンシブデザイン</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>お問い合わせ</h2>
          <p>
            ご質問やご意見がございましたら、お気軽にお問い合わせください。
          </p>
        </section>

        <nav className={styles.nav}>
          <Link href="/">ホームに戻る</Link>
        </nav>
      </main>
    </div>
  );
}
