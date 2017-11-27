import orm, asyncio,sys
from models import User, Blog, Comment

loop = asyncio.get_event_loop()
async def test():
	await orm.create_pool(loop, user='root', password='password', db='python')
	u = User(name='asas', email='42sss0@qq.com', passwd='123456', image='about:blank')
	await u.save()


loop.run_until_complete(test())
loop.close()
if loop.is_closed():
        sys.exit(0)