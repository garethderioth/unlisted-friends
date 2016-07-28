import test from 'ava';
import friends from '../src/lib/friends';
import connectToTwitter from '../src/lib/utils/connect-to-twitter';
import keys from './keys';

test(`Given an username
      When I ask for his/her friend list
      Then I should have his/her friend list.`, t => {
  const Twitter = connectToTwitter(keys.CONSUMER_KEY, keys.CONSUMER_SECRET);
  const username = 'Garethderioth';

  return friends(Twitter, username).then(friendList => {
    t.truthy(friendList.length);
  });
});

test(`Given an username that doesn\'t follow anyone
      When I ask for his/her friend list
      Then I should throw an error.`, t => {
  const Twitter = connectToTwitter(keys.CONSUMER_KEY, keys.CONSUMER_SECRET);
  const username = 'Pictoline';

  t.throws(friends(Twitter, username));
});

test(`Given an undefined username
      When I ask for his/her friend list
      Then I should throw an error.`, t => {
  const Twitter = connectToTwitter(keys.CONSUMER_KEY, keys.CONSUMER_SECRET);

  t.throws(friends(Twitter));
});
