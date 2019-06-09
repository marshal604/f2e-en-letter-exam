# English Letter Exam

## 需求
- 身份認證與登入
- 考試規則可客製化
- 分數排行榜
## Spec
### 權限
    - Super Administrator
        - 可刪除任何使用者
        - 可給予任何使用者權限
        - 可觀看目前註冊使用者訊息
            - 參與考試項目
                - 細項
                    - 考試日期
                    - 考試次數
                    - 考試分數
        - 制定考試題目
        - 可觀看全部的排行榜項目
        - 使用一般功能
    - Administrator
        - 可刪除任何學員
        - 可給予Assistant權限
        - 可觀看目前註冊使用者訊息
            - 參與考試項目
                - 細項
                    - 考試日期
                    - 考試次數
                    - 考試分數
        - 制定考試題目
        - 可觀看全部的排行榜項目
        - 使用一般功能
    - Assistant(助教)
        - 使用一般功能
        - 僅觀看自己參與過的排行榜項目
    - User(學員)
        - 使用一般功能
        - 僅觀看自己參與過的排行榜項目
### 登入頁面
    - 支援第三方登入
        - Facebook
        - Google
### 客製化選項
    - 考題時間
        - 限制
            - 幾秒
        - 不限
    - 答題選項的數量
        - 預設 (可輸入變更)
            - 4個
    - 中翻英 / 英翻中
    - 及格分數
        - 限制
            - 幾分
        - 不限
    - 考試次數
        - 限制
            - 幾次
        - 不限
### 個人設定(設定需存放DB)
    - 考題時間
        - 限制
            - 幾秒
        - 不限
    - 答題選項的數量
        - 預設 (可輸入變更)
            - 4個
    - 中翻英 / 英翻中
    - 及格分數
        - 預設
            - 60分
        - 無
### 排行榜
    - 下拉選單
        - 選擇排行榜項目
    - 顯示內容
        - 排行榜名稱
        - 學員名稱
        - 學員分數
        - 測試日期
    - 排行榜排序機制
        - 分數
        - 測驗日期
## 使用工具
### Frontend
- Angular
- Jest
- Travis CI

### Backend
- GraphQL
- PostgreSQL
- OAuth

## 架構

![structure](https://www.plantuml.com/plantuml/svg/0/bLPDRzim3BtxLmZUkOUjQ0z54JH9axQ01pGnTXgAGBOOMuWYUfAyhHlotoVPoVmHst5riid7fqUAelsW3LKctmjFxxZCgA9xmgK1jQKnaByU8H6DTud2NB8v2bHaZVfzfl2NT3vK35HfHqLb0jx1gp75kCzGWZG5qnAb2VaV89-lxTkioNj_FyredC9aGjR0dB_Yhla-BPUtjpStJJ-9X2KxvoG92aSrLLPlQQdY2wEJT7HS5ylgbyY0-0kP2AvJ4e2nrI2BttJl5raGOhNiQ68nIsN3GJAVK4ssNw1qDo3JtAHVaUK2Jg0DjIPIGTsgwkG7c70vFxtxVJ37-vHJnK9GFtaCWy0ppE5Sw1mLj8J6rjGlT9gX47Xf-syQr8lSuXW9OKeLi9O8NHXhCZe20w2s5IAqvMX5YyepKF8ATBdmDV0pxk7L2lXGKC2rwGZeoCgrN2iTiAR-F5p0PIqEDLvvoIctF1c7VGH3kHY7NOFEnSXYXFOQSfcqcwEqjahIgE1WO57GPd27pYD5JrA7xhrTum_ldLl4uDurYe_jNMktOGcrwp6ev9pmeg3ooNuD6ihSW3uDpAXhO3ufcgMhmFcJ7wBlOEj3xKYrcPPZTKnzoaDjXY_AgzKA7r7V9arpu0pMngt_3umQ6b5joLzHcqH1k0eAKXRrNtZNGRqtpBNse7EZYllNYwcbufyTwy6pVKIksDN4dTFTwTnAw_UKCmRopNbRKxWRu3w9dZllWf15TsILWtedZpFlmRQB_Jtv1m00 "structure")


## Schema設計
### user
- 用途
    - 使用者的資訊
- schema
    ```
    id
    body {
        userId
        name
        role
        password
        token
    }
    ```
### exam
- 用途
    - 紀錄考試的設定和題庫
- schema
```
id
body {
    examId
    name
    setting {
        ...
    }
    question {
        questionId
        chinese
        english
    }
}
```
### exam_result
- 用途
    - 紀錄學員作答情況
- schema
    ```
    id
    body {
        examId
        userId
        examName
        userName
        result {
            numberOfQuestion
            choose {
                questionId
                name
            }
            answer {
                questionId
                name
            }
            isCorrect
        }
        examScore
        examTime
        isCompeleted
    }
    ```
### leaderboard 
- 使用View來拉資料
- 用途
    - 紀錄排行榜資訊
- View schema
```
id
body {
    examId
    examName
    info {
        userId
        userName
        examScore
        examTime
    }
}
```
