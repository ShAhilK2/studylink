# Assets Directory

This directory contains assets for the StudyLink app.

## Icons

### SVG Icons

- `assets/icons/chat.svg` - Chat icon
- `assets/icons/explore.svg` - Explore/search icon
- `assets/icons/profile.svg` - Profile/user icon

### Android Drawables

The `assets/android-drawable/` directory contains Android vector drawable XML files:

- `ic_chat.xml` - Chat icon drawable
- `ic_explore.xml` - Explore icon drawable
- `ic_profile.xml` - Profile icon drawable

## Using Android Drawables

To use these drawables in your Android app, copy the XML files from `assets/android-drawable/` to `android/app/src/main/res/drawable/`:

```bash
cp assets/android-drawable/*.xml android/app/src/main/res/drawable/
```

These drawables are already referenced in the tab layout using the `drawable` prop:

```tsx
<Icon sf="message" drawable="chat" />
<Icon sf="magnifyingglass" drawable="explore" />
<Icon sf="person" drawable="profile" />
```

The drawable names correspond to the XML filenames without the `ic_` prefix and `.xml` extension.
