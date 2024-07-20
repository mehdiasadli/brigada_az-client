import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../../layouts/Auth.layout';
import LoginPage from '../../pages/Login.page';
import { Container } from '@mantine/core';
import RegisterPage from '../../pages/Register.page';
import { useAuth } from '../../store/auth.store';
import HomeLayout from '../../layouts/Home.layout';
import FeedPage from '../../pages/Feed.page';
import ProfileLayout from '../../layouts/Profile.layout';
import PostPage from '../../pages/Post.page';
import ProfileFeedPage from '../../pages/ProfileFeed.page';
import SettingsPage from '../../pages/Settings.page';

const Router = () => {
  const { token } = useAuth();

  return (
    <Container size='md'>
      <Routes>
        <Route path='/auth' element={token ? <Navigate replace to='/' /> : <AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route path='/' element={!token ? <Navigate replace to='/auth' /> : <HomeLayout />}>
          <Route index element={<FeedPage />} />
          <Route path='posts/:id' element={<PostPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='profile/:username' element={<ProfileLayout />}>
            <Route index element={<ProfileFeedPage />} />
          </Route>
        </Route>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Container>
  );
};

export default Router;
