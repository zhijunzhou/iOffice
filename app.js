import './env'
import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import auth from './server/routes/auth.js'
import api from './server/routes/api.js'
import jwt from 'koa-jwt'
import path from 'path'
import serve from 'koa-static'
import historyApiFallback from 'koa2-history-api-fallback'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import cors from '@koa/cors'

const app = new Koa()
const router = koaRouter()

let port = process.env.PORT

app.use(koaBodyparser())
app.use(json())
app.use(logger())
app.use(cors())

app.use(async function(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function(ctx, next) {
  //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function(err, ctx) {
  console.log('server error', err)
})

// router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
// router.use('/api', jwt({ secret: 'vue-koa-demo' }), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
router.all('/user/login', ctx => {
  ctx.body = {
    code: 20000,
    data: {
      token: 'admin'
    }
  }
})
router.all('/user/logout', ctx => {
  ctx.body = {
    code: 20000,
    data: 'success'
  }
})
router.all('/user/info', ctx => {
  ctx.body = {
    code: 20000,
    data: {
      roles: ['admin'],
      name: 'admin',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  }
})
router.all('/image/upload', ctx => {
  ctx.body = {}
})
router.all('/table/list', ctx => {
  ctx.body = {
    code: 20000,
    data: {
      items: [
        {
          id: '610000201207062511',
          title:
            'Wsjswlu yoq zbkpo qsepjpo glwvhzt lunb lrgxfdorf dtxxcn bjcenm ubi koeh mfwinkw jgeueudvs vvoisxngqa piib bjpkvazto reedsczk qxhpiov eutz zmqbf.',
          status: 'draft',
          author: 'name',
          display_time: '2010-12-29 11:13:12',
          pageviews: 3728
        },
        {
          id: '350000200309051225',
          title:
            'Inljinob naiijxwyn fpvkldcjy pyvmsqu khqnzodvpa gxhuaeh otuq qjjysxsse xppwhinv nfpluefuz dtgnwi jpvkaxret wpdgbsd gdnyqqm sbgwh irccwwyx ombxvgedc.',
          status: 'draft',
          author: 'name',
          display_time: '1974-08-05 09:27:14',
          pageviews: 473
        },
        {
          id: '500000201507077189',
          title:
            'Mjybvszygw xwax kldobvlun ggxkwbkog zqitnc giozwco vvfui brxyal nkrdbiq dmfxoiesk iiqtnge zvxybyprf ludhqniope.',
          status: 'published',
          author: 'name',
          display_time: '2010-01-03 21:56:23',
          pageviews: 3801
        },
        {
          id: '330000198401010668',
          title:
            'Qgezqgm gqxtfhsk txol gioupl clqdk tcnvjt rkfdiq vxlelebou zmd ldmnimhua acbe eweynfg nycdfi udtsrrh mywgmd.',
          status: 'published',
          author: 'name',
          display_time: '1975-06-13 05:39:13',
          pageviews: 3669
        },
        {
          id: '810000198912127125',
          title:
            'Wwhuxojsf gtwjfdr spgl hpsp tidtiipx urtdjoncnv hrq awh owghdsh kmelzmq urs tstjhvcy jqtwmdlsr orah ppzokty xyqtvxf kpoogb mwftlv yigyytbvz.',
          status: 'draft',
          author: 'name',
          display_time: '2005-07-17 01:48:06',
          pageviews: 3750
        },
        {
          id: '150000198312064759',
          title:
            'Hoytrfvn quprlpwr wyheu bewsbhlfca ibsmzqaeo soszjvqgh xqkgul hhrk fkneq szedfqiuj twzbqmze.',
          status: 'published',
          author: 'name',
          display_time: '1990-01-21 00:08:25',
          pageviews: 470
        },
        {
          id: '350000197606156168',
          title:
            'Vhruqvnp sttamx anvh voo blpczpfyt rjud nrme glwt xejwqikoj rcwib ubfwn.',
          status: 'published',
          author: 'name',
          display_time: '1978-12-22 09:46:02',
          pageviews: 1361
        },
        {
          id: '350000201112256424',
          title:
            'Ktjd ifxs ddpeelekxz iqytug wnvtcc eefdds pblrq ebbqbkcvc lpeadjtwvh rpt zdvg.',
          status: 'draft',
          author: 'name',
          display_time: '1970-01-18 00:22:58',
          pageviews: 1640
        },
        {
          id: '650000197708038788',
          title:
            'Xskppt aqdgf nvmgcq dgqo csval hnlwhpekaq ymgix fptem kcnqkfj wxlu fvgcsfmz mcscnp.',
          status: 'draft',
          author: 'name',
          display_time: '1987-01-30 02:05:25',
          pageviews: 1652
        },
        {
          id: '630000201206208113',
          title:
            'Opssscjy jnrmsisk rea exxe macilkok luhwlcdwym bogtojivgg kcif rtjum kfp bcgswxfavx fassyd tpge dokioaq lstsowk xnmywbpbv yvmwj wmwnvpsct.',
          status: 'published',
          author: 'name',
          display_time: '2001-01-27 16:04:49',
          pageviews: 1502
        },
        {
          id: '210000197312032089',
          title:
            'Prrejaa qqobsvfo kzvknrbb mmhdhlg xlx mknamtnfe kxnmfnslc yhuofcpwbg utkp aciojv blxvipj osods.',
          status: 'published',
          author: 'name',
          display_time: '1986-01-01 18:39:00',
          pageviews: 1740
        },
        {
          id: '230000197903275748',
          title:
            'Bjfrd sowoxyb tfrjitddpc aobzdjugd vcvybxn ouvgn aqracqkuuo pmjtdsqkl juhxs lfqqokyz emchplg upx hdquistyj xyexygcv lkfsnk tzjrgdeew pxhzubigg uuojb ggyror.',
          status: 'published',
          author: 'name',
          display_time: '2013-11-25 06:44:45',
          pageviews: 1509
        },
        {
          id: '370000201106126731',
          title:
            'Ayuirbmkh jfdjs vriwcpfs lpltrniuex tqlviqlup wwi nreoex qfoi onyg qwur zvzh.',
          status: 'published',
          author: 'name',
          display_time: '1984-02-07 05:11:50',
          pageviews: 4646
        },
        {
          id: '150000200206087869',
          title:
            'Klfm pqnwwon lbdog lxnfnkrvq xnnlxlpk pyq pvulvhalo kaxdrvla rgnllafph dliou tvtvklkyz lmqybph rdcpqjqsg nocnep wexsdhj.',
          status: 'published',
          author: 'name',
          display_time: '1991-08-31 13:48:57',
          pageviews: 873
        },
        {
          id: '130000197407209158',
          title:
            'Wlwruggyhs dalpafjdu dqyosor jqj wmvbjp kghjfkjdmz azio vndehoj gxm vgssnylwhe vyhivbb ttt ofo tqjxxt guoszx uvieyo.',
          status: 'deleted',
          author: 'name',
          display_time: '1985-02-17 01:26:15',
          pageviews: 2383
        },
        {
          id: '35000019981220465X',
          title:
            'Dkhxejjyol hhjn eihys qdeu lkmujtzdpb coterfef libq ewsg tkoqeis uxixjkbl cpeaz tfff bdtspn pxccdtrco wujkdgkeo ksrwjrlff kcyflr nrwiptambs qngswb.',
          status: 'draft',
          author: 'name',
          display_time: '2007-04-23 03:55:55',
          pageviews: 3193
        },
        {
          id: '140000197208281335',
          title:
            'Fdhvvbthc vxvugtt kxhi vtavbnv bqrnebno yhdsdrj hqrlm mrl xgpxuxam vovqolrde lnjunsgv znk oehkr ogyt tuhy lyprilj.',
          status: 'deleted',
          author: 'name',
          display_time: '1971-10-09 14:53:50',
          pageviews: 1346
        },
        {
          id: '540000199502268784',
          title:
            'Eungd istag yyobjtdtwk ixkwedwr scrxjsmuaz lymd rtcibr dscqdlhk djoolvkpc eoksvf dtilb dzobwrk edcio kyeflxot brqdtzoc.',
          status: 'deleted',
          author: 'name',
          display_time: '1996-03-15 03:29:06',
          pageviews: 493
        },
        {
          id: '610000198903139901',
          title:
            'Yyhtb cdfxbx kdpbnrzxi yxguyqr feyf zftwwuci oogadddph bwslin lhbrm szqucbn dxmnjc dgpanok.',
          status: 'draft',
          author: 'name',
          display_time: '2015-01-01 18:57:23',
          pageviews: 451
        },
        {
          id: '710000198605261443',
          title:
            'Xwyvoqzb sthzreogv qsgbum jtrxpfhfyb qtsauhmqc nwdmq jicxlxpg clxlcx sjmyltogw otslanoisx zvka drwnloj dxlwwjmqx.',
          status: 'deleted',
          author: 'name',
          display_time: '1983-11-08 07:38:28',
          pageviews: 1170
        },
        {
          id: '220000200405153695',
          title:
            'Eccgb vhssep sruxlpwc vbrmktpw ucyrzilb yqdwgpj sheoli codolvlej gbouxvsoj uxsxinke inx ntcssje hxobh uxrwg gcrbzn rjfcgd.',
          status: 'draft',
          author: 'name',
          display_time: '2007-11-03 09:36:10',
          pageviews: 708
        },
        {
          id: '370000201412309253',
          title:
            'Utynu wqyrx ici oly lvcfql erxikyvjxt cqbklhzgb chhf xgkcqdpn lnebhh qwb yjypwoyfdn tngzdxxdq.',
          status: 'draft',
          author: 'name',
          display_time: '2017-09-15 19:44:42',
          pageviews: 891
        },
        {
          id: '420000197103084236',
          title:
            'Houvinl efnpas gqvipzvuq usmaircs bcxxahitv arbyeu coa wxyhbg ljgu xuqmofcelm fdwpkpdm vleldic qlck wgzmn txlyryc wdrgniahou.',
          status: 'published',
          author: 'name',
          display_time: '1989-01-31 04:14:37',
          pageviews: 1969
        },
        {
          id: '130000197704016651',
          title:
            'Ebhw hqfl nytdptuc imdzzqjc duvsgxpaj blfv nsml vevtk jdei lssxdhwy ltwjrlt oxltlplff iigs jkiomsj sljuifh jrgg.',
          status: 'published',
          author: 'name',
          display_time: '1987-06-15 19:48:27',
          pageviews: 548
        },
        {
          id: '640000200011036945',
          title:
            'Rkhdggxgf lruc sgtf ctyyr ntsuhwri pewn jdmj grubg pwjebnd edi rrxe ppoyucttl imvotxs qemxoenq cmw lzfhmkyc vgjitjrug qpgvslk.',
          status: 'draft',
          author: 'name',
          display_time: '1973-06-14 15:30:44',
          pageviews: 3101
        },
        {
          id: '370000198409079341',
          title:
            'Lrt ishxw netsyudf kvtb noqoyv pogtcclge dwbtogmm ilymxn nlvtkoptl gjnvhshl zjhilb mjti lwlc gkn gutk ioxybxscbj syhaan cpecpc mntt khcsdrc.',
          status: 'deleted',
          author: 'name',
          display_time: '2013-01-17 16:59:25',
          pageviews: 1361
        },
        {
          id: '530000199003248701',
          title:
            'Vywzq tncdly ota gbqqrptwx ztoh mfhsrc pllxggzcgz kppuu kcjkiqvvse sysqiiu miooos iavjvzlrl pzaujvqk xpoeuhhl iroiveuv ebsfw.',
          status: 'draft',
          author: 'name',
          display_time: '1995-12-30 14:29:09',
          pageviews: 1797
        },
        {
          id: '520000200308172828',
          title:
            'Ffoytzgi iiifsejft wuxdlq yeie wibsvhue fcuufdvd hwmn fukcheuulr gfroxf sksp bhoiin lwms.',
          status: 'published',
          author: 'name',
          display_time: '1998-09-27 02:37:41',
          pageviews: 3103
        },
        {
          id: '500000199301086258',
          title:
            'Wtfwmrud xhcieprf hyshcbch ygsywcfto jrs sgzfe ylbz lmgkxyw bapw wbuxxki exglvhn fzrkmpebw mmcpoepe mkfytud.',
          status: 'draft',
          author: 'name',
          display_time: '1981-10-27 20:00:23',
          pageviews: 4981
        },
        {
          id: '34000020071204818X',
          title:
            'Wfbwdkc ubpujkzsg pmtsjej ymnb yscvl xlsf owwbtkc gclnvbbj nvsiiy jam winin ltxaj tpv.',
          status: 'deleted',
          author: 'name',
          display_time: '1980-09-13 16:32:17',
          pageviews: 2688
        }
      ]
    }
  }
})

app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

export default app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})
