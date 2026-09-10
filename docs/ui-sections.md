# Our Little Universe — UI Sections

## 1. Purpose

This document defines the UI structure, visual character, content hierarchy, and interaction patterns for every major section of **Our Little Universe**.

The purpose of this document is to ensure that the product maintains a consistent visual identity while allowing each section to have its own emotional and functional character.

Our Little Universe is a private digital space for exactly two people in a relationship. It should feel like a combination of:

- Digital scrapbook
- Relationship journal
- Memory archive
- Travel journal
- Private letter box
- Future dream board

The interface must **not** feel like a generic SaaS dashboard or administrative application.

---

# 2. Overall UI Direction

## 2.1 Product Personality

The interface should feel:

- Intimate
- Warm
- Romantic
- Modern
- Elegant
- Minimal
- Personal
- Calm
- Emotional
- Slightly playful

The UI should communicate:

> "This is our little place on the internet."

It should feel intentionally designed for two people rather than a generic product designed for thousands of users.

---

# 3. Design Principles

## 3.1 Emotional First

Important emotional content should receive more visual emphasis than raw data.

For example:

Prefer:

> "42 days until our next adventure"

over:

> `trip.start_date = 2026-12-12`

---

## 3.2 Content Over Decoration

Romantic visual elements should support the content rather than overwhelm it.

Avoid:

- Excessive gradients
- Excessive glassmorphism
- Excessive animations
- Too many floating elements
- Overly decorative backgrounds
- Excessive shadows

---

## 3.3 Editorial / Scrapbook Feel

Some pages should feel closer to a magazine, scrapbook, journal, or photo album than an admin dashboard.

Use:

- Large typography
- Generous whitespace
- Strong visual hierarchy
- Large photography
- Timeline compositions
- Editorial card layouts
- Asymmetrical compositions where appropriate

---

## 3.4 Consistent Design System

Although each section has a different personality, all sections must share:

- Typography system
- Spacing system
- Border radius system
- Button styles
- Input styles
- Modal/drawer patterns
- Toast patterns
- Loading states
- Empty states
- Responsive behavior
- Accessibility standards

---

# 4. Global Application Layout

## 4.1 Desktop Layout

The desktop application should use a minimal navigation structure.

Suggested layout:

```text
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  Our Little Universe                         Profile      │
│                                                           │
├──────────────┬────────────────────────────────────────────┤
│              │                                            │
│  Home        │                                            │
│  Our Story   │              Main Content                  │
│  Memories    │                                            │
│  Letters     │                                            │
│  Trips       │                                            │
│  Places      │                                            │
│  Soundtrack  │                                            │
│  Future      │                                            │
│  Just For Us │                                            │
│  Our Time    │                                            │
│  Important   │                                            │
│  Dates       │                                            │
│              │                                            │
└──────────────┴────────────────────────────────────────────┘
```

The navigation should be visually lightweight.

It should not resemble an enterprise admin sidebar.

---

## 4.2 Mobile Layout

Mobile should use a bottom navigation for the most important destinations.

Suggested:

```text
┌─────────────────────────────┐
│                             │
│        Main Content         │
│                             │
│                             │
├──────┬──────┬──────┬───────┤
│ Home │ Story│Memory│ More  │
└──────┴──────┴──────┴───────┘
```

The `More` section should contain less frequently accessed sections:

- Letters
- Open When
- Trips
- Places
- Soundtrack
- Future
- Just For Us
- Our Time
- Important Dates
- Settings

---

# 5. Shared UI Patterns

## 5.1 Page Header

Each section should have:

- Page title
- Short emotional/contextual description
- Optional primary action

Example:

```text
Our Memories

Little moments worth keeping.

                         + Add Memory
```

---

## 5.2 Cards

Cards should be:

- Clean
- Soft
- Moderately rounded
- Minimal in decoration
- Content-focused

Cards should not look like traditional SaaS metric cards unless displaying actual metrics.

---

## 5.3 Buttons

Primary actions should be visually clear but not overly aggressive.

Common actions:

- Add
- Create
- Save
- Edit
- Delete
- Open
- Continue
- Complete
- Add Photo
- Add Activity

---

## 5.4 Modal and Drawer

Use:

- Modal for short forms and confirmations
- Drawer for contextual editing when appropriate
- Full page for complex content creation

Forms should avoid unnecessary fields.

---

## 5.5 Toasts

Use toast notifications for:

- Successfully created
- Successfully updated
- Successfully deleted
- Successfully completed
- Error
- Validation failure

Messages should feel friendly and concise.

Example:

> Memory saved.

Instead of:

> The memory data has been successfully inserted into the database.

---

## 5.6 Loading States

Every data-driven section must support loading states.

Use:

- Skeletons
- Placeholder cards
- Loading indicators where appropriate

Avoid blank screens while data is loading.

---

## 5.7 Empty States

Empty states should be personal and inviting.

Avoid:

> No data found.

Prefer:

> No memories yet.

> Maybe this is where our next memory begins.

Each section should have a meaningful empty state and a relevant action.

---

# 6. Home — Our World

## Purpose

Home is the emotional overview of the entire relationship.

It should provide a quick glimpse into:

- Who we are
- How long we've been together
- What is happening soon
- Recent memories
- Letters
- Future plans

---

## 6.1 Hero / Greeting

Content:

- Time-based greeting
- Couple names
- Current date
- Optional relationship cover

Example:

```text
Good morning, Akbar & Partner.

Thursday, September 10, 2026

Another little day in our story.
```

---

## 6.2 Relationship Counter

Display:

```text
We've been us for

2 Years
3 Months
14 Days
```

Alternative:

```text
742 days together
```

The value must be calculated dynamically from the relationship `started_at`.

---

## 6.3 Today

Display:

- Daily Question
- Optional daily message

Example:

```text
Today's Question

What's one thing you want us
to experience together this year?

                    Answer →
```

---

## 6.4 Upcoming

Display:

- Next trip
- Countdown
- Nearest important date

Example:

```text
Our next adventure

Bali

42 DAYS TO GO

12 — 16 December 2026
```

---

## 6.5 Recent Memories

Display 3–4 recent memories.

Each card should contain:

- Image
- Title
- Date

Example:

```text
Sunday afternoon

12 August 2026
```

---

## 6.6 Latest Letter

If a letter is available:

```text
You have a letter.

"Something I wanted to tell you..."

Open Letter →
```

If there is no available letter, show a subtle empty state.

---

## 6.7 Our Future

Show one or more future items.

Example:

```text
One day, we'll...

☐ Watch the sunrise together in Japan
```

---

## 6.8 Quick Actions

Possible actions:

- Add Memory
- Write Letter
- Plan Trip
- Add Future

---

# 7. Our Story

## Purpose

Our Story represents the chronological journey of the relationship.

The primary UI should be a timeline.

---

## 7.1 Hero

Example:

```text
Our Story

Every chapter brought us here.

Since 28 June 2024
```

---

## 7.2 Timeline

Events should appear chronologically.

Example:

```text
● First Met
│
│  12 March 2024
│  Jakarta
│
● First Chat
│
│  15 March 2024
│
● First Date
│
│  28 June 2024
│
● Our First Trip
```

---

## 7.3 Timeline Event Card

Each event may contain:

- Title
- Date
- Location
- Description
- Cover image
- Event type

---

## 7.4 Filters

Available filters:

- All
- Milestones
- Dates
- Trips
- Memories
- Custom

---

## 7.5 Add Event

Fields:

- Title
- Description
- Date
- Event type
- Location
- Cover photo

---

# 8. Memories

## Purpose

Memories is the primary visual archive of the relationship.

The UI should prioritize photography and storytelling.

---

## 8.1 Hero

```text
Our Memories

Little moments worth keeping.
```

---

## 8.2 Gallery

Use a responsive gallery or masonry-inspired layout.

Example:

```text
┌───────────────┬─────────┐
│               │         │
│               │         │
│     Photo     │  Photo  │
│               │         │
│               │         │
├───────┬───────┴─────────┤
│       │                 │
│ Photo │      Photo      │
│       │                 │
└───────┴─────────────────┘
```

---

## 8.3 Memory Card

Display:

- Image/video thumbnail
- Title
- Date

---

## 8.4 Memory Detail

Display:

- Large media
- Title
- Date
- Location
- Story/caption
- Related trip
- Related timeline event
- Related song

---

## 8.5 Filters

- All
- Photos
- Videos
- Newest
- Oldest

Optional future functionality:

- Search
- Tags
- Year filter

---

# 9. Letters

## Purpose

Letters are private messages between the two members.

The UI should feel like a personal letter collection.

---

## 9.1 Letter Inbox

Possible states:

- Draft
- Scheduled
- Available
- Opened

Example:

```text
Letters

┌──────────────────────────────┐
│ 💌 A letter for you          │
│ Available today              │
└──────────────────────────────┘

┌──────────────────────────────┐
│ ✉ From Akbar                 │
│ "For the days you..."        │
│ Available in 12 days         │
└──────────────────────────────┘
```

---

## 9.2 Letter Detail

Available letters should open into a dedicated reading experience.

Display:

- Title
- Sender
- Date available
- Content
- Opened timestamp when applicable

---

## 9.3 Write Letter

The editor should visually resemble paper.

Fields:

- Recipient
- Title
- Content
- Available date
- Available time

Actions:

- Save Draft
- Schedule Letter

---

# 10. Open When

## Purpose

Open When contains letters intended for specific emotional situations.

---

## 10.1 Landing

Title:

```text
Open When...

For the moments when you need
a little piece of me.
```

---

## 10.2 Trigger Cards

Example cards:

```text
💔
You're feeling sad

🌙
You can't sleep

🥺
You miss me

😡
You're angry at me

🫂
You need a hug

🎉
You're happy

❤️
You need to know I love you
```

---

## 10.3 Opening Interaction

Selecting a card should produce an envelope-style interaction.

Example:

```text
┌──────────────────────────┐
│                          │
│            ✉             │
│                          │
│     Open this letter?    │
│                          │
│      [ Open Letter ]     │
│                          │
└──────────────────────────┘
```

Use Framer Motion for subtle animation.

Animation must respect `prefers-reduced-motion`.

---

## 10.4 Letter Content

After opening:

```text
Open When You're Missing Me

Dear you,

...

Love,
Akbar
```

---

# 11. Next Trips

## Purpose

Trips represent upcoming and historical adventures.

The primary visual should be travel-journal inspired.

---

## 11.1 Trip Hero

Example:

```text
┌────────────────────────────────────┐
│                                    │
│             BALI                   │
│                                    │
│          42 DAYS TO GO             │
│                                    │
│       12 — 16 Dec 2026             │
│                                    │
└────────────────────────────────────┘
```

Use the trip cover image as the visual focus.

---

## 11.2 Trip Overview

Display:

- Destination
- Start date
- End date
- Countdown
- Status
- Budget progress
- Checklist progress

---

## 11.3 Trip Navigation

Use:

```text
Overview | Itinerary | Budget | Checklist
```

On mobile, tabs may become horizontally scrollable.

---

# 12. Trip Itinerary

## Purpose

Trip Itinerary displays the schedule for each day of a trip.

---

## 12.1 Day Selector

Example:

```text
Day 1
12 Dec

Day 2
13 Dec

Day 3
14 Dec
```

---

## 12.2 Activity Timeline

Example:

```text
DAY 1
12 December

09:00
Breakfast
📍 Hotel

11:00
Go to Beach
📍 Kuta Beach
Rp 50.000

15:00
Check-in
📍 Hotel
```

---

## 12.3 Activity Detail

Fields:

- Title
- Description
- Start time
- End time
- Location
- Estimated cost
- Order

---

# 13. Trip Budget

## Purpose

Trip Budget tracks planned and actual expenses.

The UI should remain simple and visual.

---

## 13.1 Budget Overview

Example:

```text
Trip Budget

Rp 5.000.000 limit

Rp 3.250.000 spent

65%
```

Display a clear progress indicator.

---

## 13.2 Category Breakdown

Categories:

- Transportation
- Accommodation
- Food
- Activity
- Shopping
- Other

Use simple charts or progress indicators where useful.

Do not overcomplicate the page with financial-dashboard styling.

---

## 13.3 Expense List

Example:

```text
Hotel                Rp 1.200.000
Transport              Rp 500.000
Food                   Rp 350.000
```

Each expense should support:

- Title
- Category
- Estimated amount
- Actual amount
- Paid by

---

# 14. Trip Checklist

## Purpose

Trip Checklist helps both members prepare for a trip.

---

## 14.1 Checklist

Example:

```text
Before We Go ✈️

☑ Book hotel
☑ Buy tickets
☐ Pack clothes
☐ Prepare camera
☐ Charge power bank
```

---

## 14.2 Progress

Example:

```text
4 / 7 completed
████████░░░
```

---

## 14.3 Assignment

Items can be assigned to:

- Member 1
- Member 2
- Both / unassigned

Example:

```text
Akbar

☑ Buy tickets
☐ Pack charger

Partner

☑ Book hotel
☐ Prepare outfits
```

---

# 15. Our Places

## Purpose

Our Places stores places that are meaningful to the relationship.

---

## 15.1 Views

Support:

- Gallery
- List

Map can be implemented as a future enhancement.

---

## 15.2 Place Card

Display:

- Image when available
- Name
- Address
- First visited date

Example:

```text
┌────────────────────────┐
│         PHOTO          │
│                        │
│  Our Favorite Cafe     │
│  Jakarta               │
│                        │
│  First visited         │
│  12 Feb 2025           │
└────────────────────────┘
```

---

## 15.3 Place Detail

Display:

- Name
- Address
- Coordinates
- Description
- First visited date
- Related memories

---

# 16. Our Soundtrack

## Purpose

Our Soundtrack stores songs that are meaningful to the relationship.

It should feel like a personal music journal rather than a Spotify clone.

---

## 16.1 Hero

```text
Our Soundtrack

Songs that became part of us.
```

---

## 16.2 Song Card

Display:

- Album/cover artwork
- Song title
- Artist
- Play/open action
- Short story

Example:

```text
┌────────────────────────┐
│      Album Cover       │
│                        │
│ Until I Found You      │
│ Stephen Sanchez        │
│                        │
│ ▶ Listen               │
└────────────────────────┘
```

---

## 16.3 Song Detail

Display:

- Title
- Artist
- URL
- Cover
- Story
- Related memory
- Related trip
- Related timeline event

Example story:

> "We listened to this song on our first trip together."

---

# 17. Our Future

## Purpose

Our Future is a shared bucket list and dream board.

---

## 17.1 Hero

```text
Our Future

Things we haven't done yet.
```

---

## 17.2 Categories

Suggested categories:

- Places
- Experiences
- Goals
- Life
- Dreams

---

## 17.3 Future Item

Example:

```text
☐ Visit Japan
☐ Watch the sunrise together
☐ Go camping
☐ Build our dream home
☐ Travel abroad
```

---

## 17.4 Status

Each item may have:

- Planned
- In Progress
- Completed

---

## 17.5 Future Detail

Display:

- Title
- Description
- Category
- Status
- Target date
- Completion date

When completed, the UI can celebrate the achievement.

Example:

```text
We did it. ❤️
```

Completed items may later be linked to memories.

---

# 18. Just For Us

## Purpose

Just For Us contains playful interactions intended only for the couple.

---

## 18.1 Landing

```text
Just For Us

A little corner that's only ours.
```

Three primary features:

- Daily Question
- Couple Quiz
- Who Is More Likely?

---

## 18.2 Daily Question

Display one question at a time.

Example:

```text
Today's Question

What's one thing you want us
to experience together this year?

[ Answer ]
```

Each member should be able to submit their own answer.

---

## 18.3 Couple Quiz

Example:

```text
What's Akbar's favorite food?

○ Nasi Goreng
○ Mie Ayam
○ Seblak
○ Bakso

[ Submit Answer ]
```

After answering, show the correct/revealed answer where applicable.

---

## 18.4 Who Is More Likely?

Example:

```text
Who is more likely to forget
where they put their phone?

       [ Akbar ]

       [ Partner ]

       [ Both ]
```

The result should feel playful rather than competitive.

---

# 19. Our Time

## Purpose

Our Time is a dedicated emotional relationship counter.

---

## 19.1 Main Display

Example:

```text
We've been us for

2 Years
3 Months
14 Days
```

Alternative:

```text
742 Days Together
```

---

## 19.2 Start Date

Display:

```text
Since 28 June 2024
```

---

## 19.3 Milestones

Optional milestone cards:

- 100 Days
- 1 Year
- 500 Days
- 2 Years
- Custom milestones

---

# 20. Important Dates

## Purpose

Important Dates stores recurring and non-recurring relationship dates.

---

## 20.1 Upcoming Date

Prioritize the next upcoming event.

Example:

```text
UP NEXT

🎂 Her Birthday

24 September

14 days from now
```

---

## 20.2 Date Types

Supported types:

- Anniversary
- Birthday
- First Meeting
- First Date
- Custom

---

## 20.3 Date Card

Display:

- Title
- Date
- Type
- Countdown
- Recurring status

Example:

```text
❤️ Anniversary

28 June

Every year
```

---

# 21. Settings

## Purpose

Settings contains utility and account configuration.

Unlike the rest of the product, Settings may use a more conventional application UI.

---

## 21.1 Profile

Fields:

- Name
- Profile photo
- Email
- Password

---

## 21.2 Relationship

Fields:

- Relationship name
- Start date
- Description
- Cover image

---

## 21.3 Appearance

Possible settings:

- Theme
- Accent
- Reduced motion

---

## 21.4 Privacy

Settings related to:

- Relationship visibility
- Media protection
- Private content

All relationship content should remain private by default.

---

## 21.5 Account

Actions:

- Logout
- Account-related actions

---

# 22. Responsive Design Requirements

The application must be mobile-first.

## Mobile

Prioritize:

- Touch-friendly controls
- Bottom navigation
- Stacked layouts
- Horizontal scrolling for tabs where appropriate
- Large readable typography
- Easy media interaction
- Minimal form complexity

---

## Tablet

Use:

- Two-column layouts where appropriate
- Larger gallery grids
- Expanded navigation when space permits

---

## Desktop

Use:

- Sidebar navigation
- Multi-column layouts
- Larger editorial compositions
- Expanded timeline
- Larger photo galleries

---

# 23. Animation Guidelines

Use Framer Motion for meaningful interactions.

Appropriate animations:

- Page transitions
- Modal transitions
- Card entrance
- Envelope opening
- Gallery interactions
- Checkbox completion
- Countdown transitions
- Small hover interactions

Avoid:

- Constant movement
- Excessive parallax
- Distracting looping animations
- Long transitions
- Animations that interfere with usability

All animations must respect:

```text
prefers-reduced-motion
```

---

# 24. Accessibility

The UI must support:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Sufficient contrast
- Screen-reader-friendly controls
- Accessible dialogs
- Accessible form validation
- Reduced motion preferences

Interactive elements must not rely only on color.

---

# 25. Media UI

Media is an important part of the product.

Supported media experiences should include:

- Image preview
- Video preview
- Full-screen viewer where appropriate
- Thumbnail generation
- Loading state
- Error state
- Protected media access

Media should not become publicly accessible simply because a URL is known.

---

# 26. Form UX

Forms should be simple and contextual.

Prefer:

```text
Title
[_____________________]

Date
[_____________________]

Story
[_____________________]

        Cancel    Save
```

Avoid exposing technical fields to the user.

Examples of fields that should never appear in normal UI:

- `relationship_id`
- `created_by`
- `updated_at`
- Internal database IDs
- Storage paths

These must be determined server-side.

---

# 27. Error States

Errors should be human-readable.

Avoid:

> PrismaClientKnownRequestError

Prefer:

> Something went wrong while saving this memory. Please try again.

For permission failures:

> You don't have permission to access this content.

Do not expose sensitive implementation details to the user.

---

# 28. Confirmation Patterns

Destructive actions should require confirmation.

Example:

```text
Delete this memory?

This memory and its related media
will be permanently removed.

[ Cancel ]    [ Delete Memory ]
```

For destructive actions involving multiple resources, clearly explain what will be affected.

---

# 29. UI State Requirements

Important sections should support at least:

- Loading
- Loaded
- Empty
- Error
- Success
- Editing
- Saving
- Deleting
- Disabled
- Permission denied

---

# 30. Section Identity

Each section should have its own visual character.

| Section         | Primary UI Character      |
| --------------- | ------------------------- |
| Home            | Romantic overview         |
| Our Story       | Editorial timeline        |
| Memories        | Photo gallery / scrapbook |
| Letters         | Personal letter           |
| Open When       | Interactive envelope      |
| Trips           | Travel journal            |
| Itinerary       | Timeline                  |
| Budget          | Simple visual finance     |
| Checklist       | Minimal task board        |
| Places          | Travel collection         |
| Soundtrack      | Music journal             |
| Future          | Dream / bucket list board |
| Just For Us     | Playful interaction       |
| Our Time        | Emotional minimal display |
| Important Dates | Relationship calendar     |
| Settings        | Utility interface         |

---

# 31. What the UI Should NOT Become

The following patterns should be avoided unless required by functionality:

- Generic SaaS dashboard
- Enterprise admin dashboard
- Dense data tables
- Excessive KPI cards
- Excessive charts
- Overuse of glassmorphism
- Excessive gradients
- Excessive neon colors
- Generic Bootstrap-like layouts
- Overly complex navigation
- Social-media-like public feed
- Public profile system
- Gamification that makes the relationship feel competitive

---

# 32. Product-Level Visual Principle

The product should communicate four major dimensions:

```text
PAST
│
├── Our Story
├── Memories
├── Places
└── Soundtrack

NOW
│
├── Home
├── Letters
├── Open When
└── Just For Us

FUTURE
│
├── Next Trips
├── Our Future
└── Important Dates

OUR LIFE TOGETHER
│
└── Our Time
```

These sections should feel interconnected.

For example:

```text
Trip
 ↓
Itinerary
 ↓
Place
 ↓
Memory
 ↓
Timeline Event
 ↓
Song
```

Another example:

```text
Future Item
 ↓
Trip
 ↓
Memory
 ↓
Our Story
```

The UI should make these relationships discoverable without making the interface complicated.

---

# 33. Final UI Principle

Our Little Universe should feel like a **living digital scrapbook of two people's relationship**.

It should not feel like a collection of CRUD pages.

The user should be able to move naturally between:

> remembering the past → experiencing the present → planning the future.

Every major interaction should reinforce the idea that this application belongs to **the two of them**.

The final interface should feel:

> **Personal enough to keep.
> Simple enough to use.
> Beautiful enough to revisit.**
