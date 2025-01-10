import { haversineDistance } from './haversineDistance'; // Утилита для расчета расстояний

export const filterProfiles = (allProfiles, user) => {
   console.log("filter= "+user);
  const userLocation = user.location;
  console.log(userLocation);
  const maxDistance = user.distance || 50; // Максимальная дальность в км
  const [minAge, maxAge] = user.ageRange || [18, 50]; // Диапазон возраста

  return allProfiles.filter((profile) => {
    const birthDate = new Date(profile?.birthDate?.seconds * 1000);
    const age =
      new Date().getFullYear() - birthDate?.getFullYear() -
      (new Date() < new Date(birthDate?.setFullYear(new Date().getFullYear())) ? 1 : 0);

    // Проверяем возраст
    if (age < minAge || age > maxAge) return false;

    // Проверяем дальность
    console.log(userLocation);
    const distance = haversineDistance(
      userLocation?.latitude,
      userLocation?.longitude,
      profile?.location?.latitude,
      profile?.location?.longitude
    );
    if (distance > maxDistance) return false;

    // Проверяем пол (showMe)
    if (
      user.showMe !== 'EVERYONE' &&
      user.showMe !== profile.gender
    ) {
      return false;
    }

    return true; // Пользователь прошел все фильтры
  });
};