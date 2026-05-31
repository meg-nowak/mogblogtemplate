// src/App.jsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookView from './pages/BookView';
import GameDetail from './pages/GameDetail';
import CustomPage from './pages/CustomPage';
import NotFound from './pages/NotFound';
import Library from "./pages/Library.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import customPagesConfig from './siteconfig/custom-pages.json';

export default function App() {
  return (
      <HashRouter>
        <Routes>
          {/* Layout Wrapper: Everything nested here automatically gets headers/footers */}
          <Route element={<RootLayout />}>
            {/* Primary Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/book/:bookId" element={<BookView />} />
            <Route path="/games/:slug" element={<GameDetail />} />
            <Route path="/library" element={<Library />} />

            {/* Dynamic Custom Pages from JSON */}
            {customPagesConfig.map((page) => (
                <Route
                    key={page.slug}
                    path={`/${page.slug}`}
                    element={<CustomPage slug={page.slug} />}
                />
            ))}
          </Route>

          {/* Fallback (Stays outside layout so 404 is a clean canvas if desired) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
  );
}